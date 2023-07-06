import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from "expo-modules-core";

// Import the native module. On web, it will be resolved to ReactNativeDeviceActivity.web.ts
// and on native platforms to ReactNativeDeviceActivity.ts
import {
  ChangeEventPayload,
  ReactNativeDeviceActivityViewProps,
} from "./ReactNativeDeviceActivity.types";
import ReactNativeDeviceActivityModule from "./ReactNativeDeviceActivityModule";
import ReactNativeDeviceActivityView from "./ReactNativeDeviceActivityView";

type EventsLookup = Record<string, number>;

type DateComponents = {
  // calendar: Calendar?;
  // timeZone: TimeZone?;
  era?: number;
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  nanosecond?: number;
  weekday?: number;
  weekdayOrdinal?: number;
  quarter?: number;
  weekOfMonth?: number;
  weekOfYear?: number;
  yearForWeekOfYear?: number;
};

// Get the native constant value.
export const PI = ReactNativeDeviceActivityModule.PI;

export function hello(): string {
  return ReactNativeDeviceActivityModule.hello();
}

export async function setValueAsync(value: string) {
  return await ReactNativeDeviceActivityModule.setValueAsync(value);
}

export async function requestAuthorization(): Promise<void> {
  return await ReactNativeDeviceActivityModule.requestAuthorization();
}

export function getEvents(): EventsLookup {
  return ReactNativeDeviceActivityModule.getEvents();
}

type DeviceActivitySchedule = {
  intervalStart: DateComponents;
  intervalEnd: DateComponents;
  repeats: boolean;
  warningTime?: DateComponents;
};

type FamilyActivitySelection = string;

export type DeviceActivityEvent = {
  familyActivitySelection: FamilyActivitySelection;
  threshold: DateComponents;
  eventName: string;
};

export async function startMonitoring(
  activityName: string,
  deviceActivitySchedule: DeviceActivitySchedule,
  deviceActivityEvents: DeviceActivityEvent[]
): Promise<void> {
  return await ReactNativeDeviceActivityModule.startMonitoring(
    activityName,
    deviceActivitySchedule,
    deviceActivityEvents
  );
}

export function stopMonitoring(): void {
  return ReactNativeDeviceActivityModule.stopMonitoring();
}

const emitter = new EventEmitter(
  ReactNativeDeviceActivityModule ??
    NativeModulesProxy.ReactNativeDeviceActivity
);

export function addSelectionChangeListener(
  listener: (event: ChangeEventPayload) => void
): Subscription {
  return emitter.addListener<ChangeEventPayload>("onSelectionChange", listener);
}

export {
  ReactNativeDeviceActivityView,
  ReactNativeDeviceActivityViewProps,
  ChangeEventPayload,
};
