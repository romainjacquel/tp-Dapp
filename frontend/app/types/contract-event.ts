export type WorkflowStatusEventArgs = {
	previousStatus: number;
	newStatus: number;
};

export type EventData<T> = {
	args: T;
};
