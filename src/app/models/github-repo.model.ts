export interface GithubSearchResponse {
    incomplete_results: boolean,
    items: GithubRepo[],
    total_count: number
}

export interface GithubRepo {
    id: number,
    name: string,
    full_name: string,
    owner: GithubRepoOwner,
    html_url: string,
    description: string,
    fork: boolean,
    url: string,
    language: string,
    allow_forking: boolean,
    topics: string[],
    license: License,
    watchers_count: number,
    score: number,
    forks: number,
    has_issues: boolean
}

export interface GithubRepoOwner {
    login: string,
    id: number,
    avatar_url: string,
    html_url: string,
    repos_url: string
}

export interface License {
    key: string,
    name: string,
    url: string
}