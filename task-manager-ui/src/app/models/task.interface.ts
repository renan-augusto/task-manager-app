export interface ITask {
    id?: string | number,
    title: string,
    description: string,
    completed: boolean
}

export interface ITaskRequest extends ITask {
    userId: number | string,
}

export interface ITaskResponse extends ITaskRequest {
    completedAt: Date,
    createdAt: Date
}