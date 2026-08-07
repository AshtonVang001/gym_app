import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef, useCallback } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { uploadImage } from "@/services/authApi";
import { useAuth } from "@/context/AuthContext";

const ScannerPage = () => {
  const { accessToken } = useAuth();
  const [facing, setFacing] = useState<CameraType>("back");
  const ref = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const [photoFacing, setPhotoFacing] = useState<CameraType>("back");
  const lastTap = useRef<number>(0);

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

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      toggleCameraFacing();
    }
    lastTap.current = now;
  }, []);

  const submitPhoto = async () => {
    if (uri) {
      const imageUploaded = await uploadImage(uri, accessToken ?? undefined);
    }

    
  };

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
        <View style={styles.photoActions}>
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => setUri(null)}
          >
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton}>
            <Pressable onPress={submitPhoto}>
              <Text style={styles.submitText}>Submit</Text>
            </Pressable>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <CameraView style={styles.camera} facing={facing} ref={ref}>
        <Pressable style={StyleSheet.absoluteFill} onPress={handleDoubleTap} />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.flipButton}
          onPress={toggleCameraFacing}
        >
          <Ionicons name="camera-reverse-outline" size={28} color="#fff" />
        </TouchableOpacity>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.shutterOuter} onPress={takePicture}>
            <View style={styles.shutterInner} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

export default ScannerPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "#fff",
  },
  camera: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 52,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  flipButton: {
    position: "absolute",
    top: 52,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 48,
    width: "100%",
    alignItems: "center",
  },
  shutterOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
  },
  photoActions: {
    position: "absolute",
    bottom: 48,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 32,
  },
  retakeButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 14,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.4)",
  },
  retakeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2d79f3",
    paddingVertical: 14,
    borderRadius: 24,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
