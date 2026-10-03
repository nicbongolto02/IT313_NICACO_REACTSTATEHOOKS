import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// Custom Hook: useStopwatch
function useStopwatch(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return seconds;
}

// PracticeTracker Component
function PracticeTracker({
  solved,
  onSolve,
  onReset,
}: {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Practice Tracker</Text>

      <Text style={styles.solved}>Solved: {solved}</Text>

      {/* Conditional Rendering */}
      {solved >= 5 && <Text style={styles.success}>Great job!</Text>}

      <Pressable style={styles.button} onPress={onSolve}>
        <Text style={styles.buttonText}>Solve +1</Text>
      </Pressable>

      <Pressable style={styles.resetButton} onPress={onReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </Pressable>
    </View>
  );
}

// Stopwatch Component
function Stopwatch({
  seconds,
  isRunning,
}: {
  seconds: number;
  isRunning: boolean;
}) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Stopwatch</Text>

      <Text style={styles.timer}>{formattedTime}</Text>

      {/* Conditional Rendering */}
      <Text style={styles.status}>{isRunning ? "Running..." : "Paused"}</Text>
    </View>
  );
}

// LabScreen Component
function LabScreen() {
  // Main States
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Use the custom stopwatch hook
  const seconds = useStopwatch(isRunning);

  // Solve +1
  const handleSolve = () => {
    setSolved((s) => s + 1);
  };

  // Reset
  const handleReset = () => {
    setSolved(0);
  };

  // Start
  const handleStart = () => {
    setIsRunning(true);
  };

  // Stop
  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lab Timer & Practice Tracker</Text>

      {/* PracticeTracker receives props */}
      <PracticeTracker
        solved={solved}
        onSolve={handleSolve}
        onReset={handleReset}
      />

      {/* Stopwatch receives props */}
      <Stopwatch seconds={seconds} isRunning={isRunning} />

      {/* Start and Stop Buttons */}
      <View style={styles.controls}>
        <Pressable style={styles.startButton} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>

        <Pressable style={styles.stopButton} onPress={handleStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Export LabScreen
export default LabScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f6ff",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  solved: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  success: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  timer: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
  },

  status: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
  },

  button: {
    backgroundColor: "#515359",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  resetButton: {
    backgroundColor: "#777777",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  startButton: {
    flex: 1,
    backgroundColor: "#a72861",
    padding: 15,
    borderRadius: 10,
  },

  stopButton: {
    flex: 1,
    backgroundColor: "#170a0b",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
