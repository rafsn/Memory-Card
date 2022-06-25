const section = document.querySelector('section')
const playerLivesCount = document.querySelector('span')
let playerLives = 6

playerLivesCount.textContent = playerLives;

const getData = () => [
    { imgSrc: "./img/beatles.jpeg", name: "beatles"},
    { imgSrc: "./img/blink182.jpeg", name: "blink 182"},
    { imgSrc: "./img/fkatwigs.jpeg", name: "fkatwigs"},
    { imgSrc: "./img/fleetwood.jpeg", name: "fleetwood"},
    { imgSrc: "./img/joy-division.jpeg", name: "joy division"},
    { imgSrc: "./img/ledzep.jpeg", name: "led zeppelin"},
    { imgSrc: "./img/metallica.jpeg", name: "metallica"},
    { imgSrc: "./img/pinkfloyd.jpeg", name: "pink floyd"},
    { imgSrc: "./img/beatles.jpeg", name: "beatles"},
    { imgSrc: "./img/blink182.jpeg", name: "blink 182"},
    { imgSrc: "./img/fkatwigs.jpeg", name: "fkatwigs"},
    { imgSrc: "./img/fleetwood.jpeg", name: "fleetwood"},
    { imgSrc: "./img/joy-division.jpeg", name: "joy division"},
    { imgSrc: "./img/ledzep.jpeg", name: "led zeppelin"},
    { imgSrc: "./img/metallica.jpeg", name: "metallica"},
    { imgSrc: "./img/pinkfloyd.jpeg", name: "pink floyd"},
]

const randomize = () => {
    const cardData = getData()
    cardData.sort(() => Math.random() -0.5)
    return cardData
}

const cardGenerator = () => {
    const cardData = randomize()

    cardData.forEach((item) => {
        const card = document.createElement("div")
        const face = document.createElement("img")
        const back = document.createElement("div")
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";

        face.src = item.imgSrc;
        card.setAttribute('name', item.name)
        section.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)

        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard')
            checkCards(e)
        })
    })
}
const checkCards = (e) => {
    const clickedCard = e.target
    clickedCard.classList.add('flipped')
    const flippedCards = document.querySelectorAll('.flipped')
    const toggleCard = document.querySelectorAll('.toggleCard')

    //Logic
    if (flippedCards.length === 2) {
        if (flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')) {
            console.log("match")
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                card.style.pointerEvents = "none"
            })
        } else {
            console.log("wrong")
            flippedCards.forEach(card => {
                card.classList.remove('flipped')
                setTimeout(() => card.classList.remove("toggleCard"), 1000)
            })
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                restart("Try again!")
            }
        }
    }
    if (toggleCard.length === 16 ) {
        restart("You won!")
    }
}

const restart = (text) => {
    let cardData = randomize()
    let faces = document.querySelectorAll('.face')
    let cards = document.querySelectorAll('.cards')
    section.style.pointerEvents = 'none'
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard')

        setTimeout(() => {
            cards[index].style.pointerEvents = "all"
            faces[index].src = item.imgSrc
            cards[index].setAttribute('name', item.name)
            section.style.pointerEvents = 'all'
        }, 1000)
    })
    playerLives = 6
    playerLives.textContent = playerLives
    setTimeout(() => window.alert(text), 100)
}

cardGenerator()