export const mockUserLogin = {
  email: 'bigLebow@yahoo.com',
  password: 'password',
}

export const mockUserLoginResponse = {
  data: {
    email: "bigLebow@yahoo.com",
    id: 1,
    name: "Taylor",
    password: "password",
  },
  message: "Retrieved ONE User",
  status: "success",
}

export const mockUserSignup = {
  email: 'bigLebow@yahoo.com',
  password: 'password',
  username: 'Taylor'
}

export const mockUserSignUpResponse = { 
  status: 'success', 
  data: {}, 
  message: "New user created", 
  id: 9
}

export const mockAddMovieResponse = { 
  status: 'success', 
  message: "Movie was added to favorites",
  id: 9
}

export const mockRetrieveFavoritesResponse = {
  status: 'success',
  data: {},
  message: 'Retrieved All favorites'
}

export const mockRemoveFavoritesResponse = {
  status: 'success', 
  message: 'one row was deleted.'
}

export const mockMovie =   {
  title: 'The Big Lebowski',
  date: "1998-03-06",
  poster: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/aHaVjVoXeNanfwUwQ92SG7tosFM.jpg",
  overview: "Jeffrey \"The Dude\" Lebowski, a Los Angeles slacker who only wants to bowl and drink white Russians, is mistaken for another Jeffrey Lebowski, a wheelchair-bound millionaire, and finds himself dragged into a strange series of events involving nihilists, adult film producers, ferrets, errant toes, and large sums of money.",
  voteAverage: 7.9,
  id: 115,
  currentUser: {id: 3}
}

export const mockMovies = [
  {
    title: 'The Big Lebowski',
    date: "1998-03-06",
    poster: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/aHaVjVoXeNanfwUwQ92SG7tosFM.jpg",
    overview: "Jeffrey \"The Dude\" Lebowski, a Los Angeles slacker who only wants to bowl and drink white Russians, is mistaken for another Jeffrey Lebowski, a wheelchair-bound millionaire, and finds himself dragged into a strange series of events involving nihilists, adult film producers, ferrets, errant toes, and large sums of money.",
    voteAverage: 7.9,
    id: 115
  }
]

export const mockResults = {

  "cast": [
    {
      "character": "Himself",
      "credit_id": "52fe4a83c3a368484e157c7f",
      "poster_path": "/xF7FR027EVRrEjBnyDHNWpw9rsg.jpg",
      "id": 122825,
      "video": false,
      "vote_count": 1,
      "adult": false,
      "backdrop_path": null,
      "genre_ids": [
      99
      ],
      "original_language": "en",
      "original_title": "Minnesota Nice",
      "popularity": 0.84,
      "title": "Minnesota Nice",
      "vote_average": 6,
      "overview": "A collection of cast interviews and behind-the-scenes clips from the Cohen brother's Academy Award-winning film Fargo.",
      "release_date": "2003-04-01"
    },
  ],
  "crew": [
    {
      "id": 115,
      "department": "Directing",
      "original_language": "en",
      "original_title": "The Big Lebowski",
      "job": "Director",
      "overview": "Jeffrey \"The Dude\" Lebowski, a Los Angeles slacker who only wants to bowl and drink white Russians, is mistaken for another Jeffrey Lebowski, a wheelchair-bound millionaire, and finds himself dragged into a strange series of events involving nihilists, adult film producers, ferrets, errant toes, and large sums of money.",
      "vote_count": 4625,
      "video": false,
      "poster_path": "/aHaVjVoXeNanfwUwQ92SG7tosFM.jpg",
      "backdrop_path": "/tfsQj1MHtyC1KGrQLGlCzljUdQY.jpg",
      "title": "The Big Lebowski",
      "popularity": 13.241,
      "genre_ids": [
      35,
      80
      ],
      "vote_average": 7.9,
      "adult": false,
      "release_date": "1998-03-06",
      "credit_id": "52fe4219c3a36847f80040f1"
    },
    {
      "id": 115,
      "department": "Editing",
      "original_language": "en",
      "original_title": "The Big Lebowski",
      "job": "Editor",
      "overview": "Jeffrey \"The Dude\" Lebowski, a Los Angeles slacker who only wants to bowl and drink white Russians, is mistaken for another Jeffrey Lebowski, a wheelchair-bound millionaire, and finds himself dragged into a strange series of events involving nihilists, adult film producers, ferrets, errant toes, and large sums of money.",
      "vote_count": 4625,
      "video": false,
      "poster_path": "/aHaVjVoXeNanfwUwQ92SG7tosFM.jpg",
      "backdrop_path": "/tfsQj1MHtyC1KGrQLGlCzljUdQY.jpg",
      "title": "The Big Lebowski",
      "popularity": 13.241,
      "genre_ids": [
      35,
      80
      ],
      "vote_average": 7.9,
      "adult": false,
      "release_date": "1998-03-06",
      "credit_id": "52fe4219c3a36847f8004127"
    },
  ]
}