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
}

export interface GithubRepoOwner {
    login: string,
    id: number,
    avatar_url: string,
    url: string,
    repos_url: string
}