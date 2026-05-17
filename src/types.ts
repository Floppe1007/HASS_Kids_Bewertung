export interface TaskConfig {
  id: string;
  name: string;
  icon: string;
  minutes: number;
}

export interface CardConfig {
  name: string;
  entity_media_time: string;
  entity_task_state: string;
  pin: string;
  redeem_amounts: number[];
  tasks: TaskConfig[];
}

export interface TaskState {
  date: string;
  done: string[];
}
