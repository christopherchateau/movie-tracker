export const mockUserLoginResponse = {
  data: {
    email: "bigLebow@yahoo.com",
    id: 1,
    name: "Taylor",
    password: "password"
  },
  message: "Retrieved ONE User",
  status: "success"
};

export const mockUserData = {
  data: {
    name: 'Taylor',
    id: 7
  }
}

export const mockMovies = [
  {
    title: "The Big Lebowski",
    date: "1998-03-06",
    poster:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/aHaVjVoXeNanfwUwQ92SG7tosFM.jpg",
    overview:
      'Jeffrey "The Dude" Lebowski, a Los Angeles slacker who only wants to bowl and drink white Russians, is mistaken for another Jeffrey Lebowski, a wheelchair-bound millionaire, and finds himself dragged into a strange series of events involving nihilists, adult film producers, ferrets, errant toes, and large sums of money.',
    voteAverage: 7.9,
    movie_id: 115,
    favorited: false
  }
]

export const mockUserSignUpResponse = {
  status: "success",
  data: {},
  message: "New user created",
  id: 9
}