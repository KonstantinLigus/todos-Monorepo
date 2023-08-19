// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: 'JWT_TOKEN_STUDENT',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: 'TOKEN'
};

// React-query keys
export const QUERY_KEYS = {
  TODOS_FILTER: 'TodosFilter',
  TOKEN: 'TOKEN',
  FILTER: 'todos/filter',
  TRENDING: 'trending',
  TODOS: 'todos',
  TODO: 'todo',
  USER: 'user'
};

// Backend Routes
export const BACKEND_KEYS = {
  BASE_TODOS: 'http://localhost:4200',
  TODOS: 'todos',
  USER_REGISTER: 'user/register',
  USER_LOGIN: 'user/login',
  USER_REFRESH: 'user/refresh',
  BASE_TODOS_URL: 'http://localhost:4200/api/todos',
  FILTER: 'todos/filter',
  PER_PAGE: 5,
  TRENDING: 'trending',
  FEATURED_ARTICLES: 'featured_articles'
};

export const ROUTER_KEYS = {
  ROOT: '/',
  HOME: 'home',
  REGISTER: '/register',
  LOGIN: '/login',
  TODOS: '/todos',
  TODO_CREATE: '/todo/create',
  TODO_ID: '/todo/:id',
  TODO: '/todo'
};
