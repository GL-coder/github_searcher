import axios from "axios";


const token = "ghp_..."; // put here your GitHub token: https://github.com/settings/tokens

export const findUsers = async (searchLogin) => {
    let result = []

    await axios.get('https://api.github.com/search/users',
        {
            headers: {
                accept: 'application/vnd.github+json',
                authorization: `token ${token}`
            },
            params: {
                q: `${searchLogin} in:login`,
                per_page: 50,
                page: 1,
                order: "desk",
            }
        }).then((resp) => {
        result = resp.data.items
    }).catch((err) => console.log('findUsers error: ' + err));

    return result
}

export const findUser = async (login) => {
    let result = []

    await axios.get(`https://api.github.com/users/${login}`,
        {
            headers: {
                accept: 'application/vnd.github+json',
                authorization: `token ${token}`,
            }
        }).then((resp) => {
        result = resp.data
    }).catch((err) => console.log('findUser error: ' + err));

    return result
}

export const findUserRepos = async (login) => {
    let result = [];

    await axios.get(`https://api.github.com/users/${login}/repos`,
        {
            headers: {
                accept: 'application/vnd.github+json',
                authorization: `token ${token}`
            }
        }).then((resp) => {
        result = resp.data
    }).catch((err) => console.log('findUserRepos error: ' + err));

    return result
}

export const findUserReposWithTerm = async (login, term) => {
    let result = []

    await axios.get(`https://api.github.com/search/repositories`,
        {
            headers: {
                accept: 'application/vnd.github+json',
                authorization: `token ${token}`
            },
            params: {
                q: `${term} user:${login} is:public in:name`,
                per_page: 100,
                page: 1,
            },
        }).then((resp) => {
        result = resp.data.items
    }).catch((err) => console.log('findUserReposWithTerm error: ' + err))

    return result
}
