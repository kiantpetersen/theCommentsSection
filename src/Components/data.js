import userImg1 from '../images/image-amyrobson.png'
import userImg2 from '../images/image-juliusomo.png'
import userImg3 from '../images/image-maxblagun.png'
import userImg4 from '../images/image-ramsesmiron.png'
// import userImg4 from '../images/image-ramsesmiron.png'

const data = [
    {
        id: 11111,
        userName: 'kiantp',
        votes: 12,
        comment: "Don't lie to me Obi-wan, I see through the lies of the Jedi. I do not fear the dark side as you do. I have brought peace, freedom, justice and security to my new Empire.",
        isPrimary: true,
        originalPost: null,
        replies: [],
        date: "11/06/2023 08:52",
        image: userImg1
    },
    {
        id: 11112,
        userName: 'denlope',
        votes: 6,
        comment: "Life can not be Experienced in you book. Life is out there, in the world",
        isPrimary: true,
        originalPost: null,
        replies: [22221, 22223],
        date: "11/06/2023 08:52",
        image: userImg2
    },
    {
        id: 22223,
        userName: 'ramseschan',
        votes: 4,
        comment: "Because the older you do get, the more rules they are going to try to get you to follow. You just gotta keep livin' man. L-I-V-I-N.",
        isPrimary: false,
        originalPost: 11112,
        replies: [],
        date: "11/06/2023 08:52",
        image: userImg3
    },
    {
        id: 22221,
        userName: 'maxblagun',
        votes: 2,
        comment: "So many successfull men in the past had a well developed sexual nature. Freddy Mercury, Gerorge Michael, Albert Einstein, Oscar Wilde.",
        isPrimary: false,
        originalPost: 11112,
        replies: [],
        date: "11/06/2023 10:25",
        image: userImg4
    },

]

export default data