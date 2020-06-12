import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(subreddit) {

  

  //Local Server
  const serverUrl = 'http://localhost:8000';
  const credentials = 'NDY0MmU2NDA0MGNkYjhiODljMzEwYTIxYTA3YzdmNjI6MjMyNjQxNTY1OTA3NWU3NTAwMGNlY2Q3YmNiZjM3NTY=';

  // Company Server    
  // const serverUrl = 'https://sandbox.2600hz.com:8443/v2';
  // const credentials = 'NDY0MmU2NDA0MGNkYjhiODljMzEwYTIxYTA3YzdmNjI6MjMyNjQxNTY1OTA3NWU3NTAwMGNlY2Q3YmNiZjM3NTY=';

  const accountId = '4642e64040cdb8b89c310a21a07c7f62';
  const vmBoxId = 'b37675a2d7b90d60f0ee5d4175502394';
  const requestUrl = `${serverUrl}/accounts/${accountId}/vmboxes/${vmBoxId}/messages`;

  var myheaders = new Headers();

  myheaders.append("Authorizaction", "Basic " + credentials);
  myheaders.append("Accept", "json");
  myheaders.append("Content-Type", "application/json; charset=UTF-8");
  myheaders.append("X-Custom-Header", "ProcessThisImmediately");
  myheaders.append('Access-Control-Allow-Origin', '*');
  myheaders.append('Access-Control-Allow-Credentials', 'true');
  myheaders.append('Access-Control-Allow-Methods', 'GET');
  myheaders.append('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  myheaders.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  myheaders.append('Content-Type', 'application/json')


  const request = {
    method:'GET',
    mode: 'no-cors',
    headers: myheaders
};

  return dispatch => {
    dispatch(requestPosts(subreddit))

    return fetch(

    requestUrl,request
    )
    .then((response) => {
      // *** Check for HTTP failure
    
      if (!response.ok) {
          throw new Error("HTTP status " + response.status);
      }
      // *** Read and parse the JSON
      
      return response.json();
  })
  
  .then(json => dispatch(receivePosts(subreddit, json)))
  .then((res) => {
      // *** Use the object
      alert(res.message);
  })
  .catch((error) => {
      /* ...*** handle/report error, since this code doesn't return the promise chain...*/
  });
     
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}