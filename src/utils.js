export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US');
};

export const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const filterTasksByStatus = (tasks, status) => {
    return tasks.filter(task => task.status === status);
};