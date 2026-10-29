
export type ScreenIndex = 0 | 1 | 2 | 3 | 4;
export type BodyArea = "shoulder" | "knee" | "back";
export type PhoneScenario = {
  screen: ScreenIndex;
  context: string;
  greeting: string;
  focus: string;
  title: string;
  detail: string;
  rows: readonly { label: string; value: string }[];
  note: string;
  metric?: { value: string; label: string };
  area?: BodyArea;
  location?: string;
  recoveryStep?: number;
};
export const screenNames = ["Home", "Train", "Eat", "Recover", "You"] as const;
export const productScreens: readonly PhoneScenario[] = [
  { screen: 0, context: "MONDAY, YOUR WAY", greeting: "Your day.\nYour direction.", focus: "TODAY’S PLAN", title: "Full-body strength", detail: "At the gym · Built around your schedule", metric: { value: "60", label: "MINUTES AVAILABLE" }, rows: [{ label: "Next up", value: "Your strength session" }, { label: "Recovery check-in", value: "Ready to move" }], note: "Training, food and recovery. Together." },
  { screen: 1, context: "YOUR TRAINING", greeting: "Show up.\nWe’ll adapt.", focus: "FULL-BODY STRENGTH", title: "Dumbbell press", detail: "No bench available? Your session keeps moving.", metric: { value: "3 × 10", label: "SETS × REPS" }, rows: [{ label: "Goblet squat", value: "3 × 12" }, { label: "Dumbbell press", value: "3 × 10" }], note: "Equipment changed. Your plan adjusted." },
  { screen: 2, context: "FIND YOUR BALANCE", greeting: "Nourish\nyour rhythm.", focus: "DAILY NOURISHMENT", title: "Room for how you eat.", detail: "A balanced day, built around your preferences.", metric: { value: "1,640", label: "OF 2,200 KCAL" }, rows: [{ label: "Protein", value: "112 / 140 g" }, { label: "Next meal", value: "Rice bowl + greens" }], note: "A flexible rhythm. Real food." },
  { screen: 3, context: "YOUR RECOVERY", greeting: "Listen.\nThen adjust.", focus: "BODY CHECK-IN", title: "Shoulder selected", detail: "Reduce pressing. Make room for gentle movement.", area: "shoulder", recoveryStep: 1, rows: [{ label: "Today’s adjustment", value: "Pressing paused" }, { label: "Movement guidance", value: "Gentle mobility" }], note: "Persistent discomfort? Seek qualified support." },
  { screen: 4, context: "YOUR JOURNEY SO FAR", greeting: "Progress.\nWith context.", focus: "SIX WEEKS OF SHOWING UP", title: "A stronger foundation", detail: "Your progress includes the days life changed.", metric: { value: "18", label: "SESSIONS / 6 WEEKS" }, rows: [{ label: "Consistency", value: "3 sessions / week" }, { label: "In the picture", value: "Training + recovery" }], note: "Every part of your journey counts." },
];

