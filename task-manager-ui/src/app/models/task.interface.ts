export interface ITask {
    id?: string | number,
    title: string,
    description: string,
    completed: boolean
}

export interface ITaskRequest extends ITask {
    userId?: number | string | null,
}

export interface ITaskResponse extends ITaskRequest {
    completedAt: Date,
    createdAt: Date
}

export interface ITaskDelete {
    id?: string | number,
    userId?: number | string | null,
}