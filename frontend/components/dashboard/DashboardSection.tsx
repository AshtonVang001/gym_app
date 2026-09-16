import { View, Text, Pressable } from "react-native";
import { dashboardSectionStyles as styles } from "@/constants/dashboardSectionStyles";

type Props = {
  title: string;
  actionLabel: string;
  onAction?: () => void;
  children: React.ReactNode;
};

export default function DashboardSection({ title, actionLabel, onAction, children }: Props) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={onAction}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      </View>
      <View style={styles.card}>{children}</View>
    </View>
  );
}
