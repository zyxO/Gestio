import type { Task } from "../types/Task";

export function getInitialTask(task?: Task): Task {
    return {
        "@id": task?.["@id"] ?? '',
        "@type": task?.["@type"] ?? '',
        id: task?.id ?? 0,
        name: task?.name ?? '',
        description: task?.description ?? '',
        status: task?.status ?? 0,
        userId: task?.userId ?? '',
        projectId: task?.projectId ?? '',
        createdAt: task?.createdAt ?? '',
        iri: task?.iri ?? '',
        comments: task?.comments ?? [],
    };
}