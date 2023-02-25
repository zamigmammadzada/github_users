/*

avatar_url
html_url
following_url
followers_url
location
bio
followers
following
created_at

 */

// CONSTANTS
const GITHUB_URL = "https://api.github.com/users/"

// elements

const input_user_name = document.getElementById('input_user_name')
const find_user_btn = document.getElementById('find_user_btn')

const git_user_name = document.getElementById('git_user_name')
const git_user_location = document.getElementById('git_user_location')
const git_user_bio = document.getElementById('git_user_bio')
const git_user_join = document.getElementById('git_user_join')
const git_user_followers_count = document.getElementById('git_user_followers_count')
const git_user_following_count = document.getElementById('git_user_following_count')
const git_user_img = document.getElementById('git_user_img')
const follower_container = document.getElementById('follower_container')


input_user_name.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') BtnOnClick()
})

find_user_btn.addEventListener('click', () => BtnOnClick())

function BtnOnClick() {
    const useradi = input_user_name.value

    axios.get(GITHUB_URL + useradi).then(({ data }) => {
        console.log(data)
        writeUserInfo(data)
        writeFollowers(data.followers_url)
    })
}
function writeFollowers(followers_url) {
    axios.get(followers_url).then(({ data }) => {
        follower_container.innerHTML = ''
        data.forEach((follower) => {
            follower_container.innerHTML += `<div><div><p>User name: ${follower.login}</p><a target="_blank" href="${follower.html_url}">User link</a></div><div><img  src="${follower.avatar_url}" alt="${follower.login} image"></div></div>`
        })
    })
}
function writeUserInfo(data) {
    git_user_name.textContent = data.login
    git_user_location.textContent = data.location || "-----"
    git_user_bio.textContent = data.bio || "-----"
    git_user_join.textContent = data.created_at.slice(0, 10)
    git_user_followers_count.textContent = data.followers
    git_user_following_count.textContent = data.following
    git_user_img.src = data.avatar_url
}