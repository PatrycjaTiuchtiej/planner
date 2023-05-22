export type EventModel = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};

export enum DictOperations {
  Edit = 1,
  Delete = 2,
}
