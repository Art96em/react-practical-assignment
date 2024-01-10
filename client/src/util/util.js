export const options = { year: "numeric", month: "long", day: "numeric" }

export const getDate = (date) => date.toLocaleDateString(undefined, options) + " " + date.toLocaleTimeString(options)

export const pages = {
    LOGIN: '/login',
    POSTS: '/posts'
}