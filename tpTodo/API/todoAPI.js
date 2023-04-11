const API_URL = "http://127.0.0.1:4000";

const SIGN_IN =
  "mutation($username:String!, $password:String!){signIn(username:$username, password:$password)}";

const SIGN_UP =
  "mutation($username:String!, $password:String!){signUp(username:$username, password:$password)}";

const INPUT = `mutation($title: String!, $username: String!) {
  createTaskLists(
    input: {
      title: $title
      owner: { connect: { where: { username: $username } } }
    }
  ) {
    taskLists {
      id
      title
      owner {
        username
      }
    }
  }
}`;

const TASKLIST = `query taskLists($username: String!) {
  taskLists(where: { owner: { username: $username } }) {
    id
    title
  }
}`;

const TASKS = `query($id: ID!){
  tasks(where:{belongsTo:{id:$id}}) {
    id
    content
    done
    belongsTo{title owner{username}}
  }
}`;

const DELETE_TASKLIST = `mutation($id: ID!) {
  deleteTasks(where: { belongsTo: {id: $id} }) {
    nodesDeleted
  }
   deleteTaskLists(where: { id: $id }) {
    nodesDeleted
  }
}
`;

const ADD_TASK = `mutation($content: String!, $id: ID!) {
  createTasks(
    input: {
      content: $content
      done: false
      belongsTo: {
        connect: { where: {id: $id} }
      }
    }
  ) {
    tasks {
      id
      content
      done
    
    }
  }
}`;

const DELETE_TASK = `mutation($id: ID!) {
  deleteTasks(where: { id : $id })
  {
    nodesDeleted
  }
}
`;

const UPDATE_TASK = `mutation($id: ID!, $done: Boolean) {
  updateTasks(where: { id: $id }, update: { done: $done }) {
    tasks {
      id
      content
      done
    }
  }
}`;

const ALL_TASK = `query($username: String) {
  tasks(where: { belongsTo: { owner: { username : $username} } }) {
    id
    content
    done
    belongsTo {
      title
      owner {
        username
      }
    }
  }
}
`;


export function signIn(username, password) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: SIGN_IN,
      variables: {
        username: username,
        password: password,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.signIn;
    })
    .catch((error) => {
      throw error;
    });
}

export function signUp(username, password) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: SIGN_UP,
      variables: {
        username: username,
        password: password,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.signUp;
    })
    .catch((error) => {
      throw error;
    });
}

export function getTaskLists(username, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: TASKLIST,
      variables: {
        username: username,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.taskLists;
    })
    .catch((error) => {
      throw error;
    });
}

export function getTodos(id, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: TASKS,
      variables: {
        id: id,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.tasks;
    })
    .catch((error) => {
      throw error;
    });
}

export function input(title, username, token) {
  if (title === "") return null;
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: INPUT,
      variables: {
        title: title,
        username: username,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.createTaskLists.taskLists[0];
    })
    .catch((error) => {
      throw error;
    });
}

export function deleteTaskList(id, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: DELETE_TASKLIST,
      variables: {
        id: id,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.deleteTaskLists;
    })
    .catch((error) => {
      throw error;
    });
}

export function addTask(content, id, token) {
  if (content === "") return null;
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: ADD_TASK,
      variables: {
        content: content,
        id: id,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.createTasks.tasks[0];
    })
    .catch((error) => {
      throw error;
    });
}

export function deleteTask(id, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: DELETE_TASK,
      variables: {
        id: id,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.deleteTasks;
    })
    .catch((error) => {
      throw error;
    });
}

export function updateTask(id, done, token) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: UPDATE_TASK,
      variables: {
        id: id,
        done: done,
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.updateTasks.tasks[0];
    })
    .catch((error) => {
      throw error;
    });
}

export function getAllTask(token, username) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      query: ALL_TASK,
      variables: {
        username: username
      },
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0];
      }
      return jsonResponse.data.tasks;
    })
    .catch((error) => {
      throw error;
    });
}
