import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { scannerStyles as styles } from "@/constants/scannerStyles";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { scanPhysique } from "@/services/authApi";
import type { PhysiqueScan } from "@/types/types";
import ScanResults from "@/components/scanner/ScanResults";

const TIMER_OPTIONS = [0, 3, 5, 10] as const;
type TimerOption = (typeof TIMER_OPTIONS)[number];

const ScannerPage = () => {
  // All hooks before any early returns
  const [facing, setFacing] = useState<CameraType>("back");
  const ref = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const [photoFacing, setPhotoFacing] = useState<CameraType>("back");
  const lastTap = useRef<number>(0);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<PhysiqueScan | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);

  const [timerDuration, setTimerDuration] = useState<TimerOption>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const toggleCameraFacing = useCallback(() => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }, []);

  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) toggleCameraFacing();
    lastTap.current = now;
  }, [toggleCameraFacing]);

  const resetScan = useCallback(() => {
    setUri(null);
    setScanResult(null);
    setScanError(null);
    setScanning(false);
  }, []);

  const cancelCountdown = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCountdown(null);
  }, []);

  // Early returns after all hooks
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      setPhotoFacing(facing);
      setUri(photo.uri);
    }
  };

  const handleShutter = () => {
    if (timerDuration === 0) {
      takePicture();
      return;
    }

    setCountdown(timerDuration);
    let remaining = timerDuration;

    intervalRef.current = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setCountdown(null);
        takePicture();
      } else {
        setCountdown(remaining);
      }
    }, 1000);
  };

  const submitPhoto = async () => {
    if (!uri) return;
    setScanning(true);
    setScanError(null);
    try {
      const result = await scanPhysique(uri);
      if (result.success && result.data) {
        setScanResult(result.data);
      } else {
        setScanError(result.message ?? "Analysis failed. Please try again.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      const isAuthError = msg.includes("refresh") || msg.includes("token") || msg.includes("Unauthorized");
      setScanError(
        isAuthError
          ? "Session expired. Please log in again."
          : "Network error. Please check your connection and try again.",
      );
    } finally {
      setScanning(false);
    }
  };

  // Results screen
  if (scanResult) {
    return <ScanResults result={scanResult} onNewScan={resetScan} />;
  }

  // Photo preview + loading/error states
  if (uri) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri }}
          style={[
            StyleSheet.absoluteFill,
            photoFacing === "front" && { transform: [{ scaleX: -1 }] },
          ]}
          resizeMode="cover"
        />

        {scanning && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Analyzing physique...</Text>
            <Text style={styles.loadingSubtext}>This may take a few seconds</Text>
          </View>
        )}

        {scanError && !scanning && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{scanError}</Text>
          </View>
        )}

        {!scanning && (
          <View style={styles.photoActions}>
            <TouchableOpacity style={styles.retakeButton} onPress={resetScan}>
              <Text style={styles.retakeText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={submitPhoto}>
              <Text style={styles.submitText}>{scanError ? "Try Again" : "Submit"}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  // Camera view
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <CameraView style={StyleSheet.absoluteFill} facing={facing} ref={ref} />
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={countdown === null ? handleDoubleTap : undefined}
      />

      {/* Countdown overlay */}
      {countdown !== null && (
        <View style={styles.countdownOverlay}>
          <Text style={styles.countdownNumber}>{countdown}</Text>
          <TouchableOpacity style={styles.cancelButton} onPress={cancelCountdown}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Top controls — hidden during countdown */}
      {countdown === null && (
        <>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </>
      )}

      {/* Bottom bar — hidden during countdown */}
      {countdown === null && (
        <View style={styles.bottomBar}>
          {/* Timer selector */}
          <View style={styles.timerRow}>
            {TIMER_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.timerOption,
                  timerDuration === option && styles.timerOptionActive,
                ]}
                onPress={() => setTimerDuration(option)}
              >
                {option === 0 ? (
                  <Ionicons
                    name="timer-outline"
                    size={16}
                    color={timerDuration === 0 ? "#fff" : "rgba(255,255,255,0.5)"}
                  />
                ) : (
                  <Text
                    style={[
                      styles.timerOptionText,
                      timerDuration === option && styles.timerOptionTextActive,
                    ]}
                  >
                    {option}s
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Shutter */}
          <TouchableOpacity style={styles.shutterOuter} onPress={handleShutter}>
            <View style={styles.shutterInner} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ScannerPage;

