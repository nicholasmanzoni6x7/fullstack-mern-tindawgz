import React, { useState, useMemo, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import './Card.css'
import CloseIcon from '@material-ui/icons/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';

const dawgMatches = [
    {
        name: 'Noodle',
        breed: 'American Eskimo',
        image: 'https://upload.wikimedia.org/wikipedia/commons/4/47/American_Eskimo_Dog.jpg'
    },
    {
        name: 'Ulric',
        breed: 'Corgi',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ThreeTimeAKCGoldWinnerPembrookeWelshCorgi.jpg'
    },
    {
        name: 'Jojo',
        breed: 'Dalmatian',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Dalmatiner_2.jpg'
    },
]

const TindawgCards = () => {
    const [currentIndex, setCurrentIndex] = useState(dawgMatches.length - 1);
    const [lastDirection, setLastDirection] = useState()
    const currentIndexRef = useRef(currentIndex)

    //caches queue
    const childRefs = useMemo(() =>
        Array(dawgMatches.length)
            .fill(0)
            .map((i) => React.createRef()),
        []
    )

    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }

    const canGoBack = currentIndex < dawgMatches.length - 1
    const canSwipe = currentIndex >= 0;

    //decreases index
    const swiped = (direction, deleteDirection, i) => {
        setLastDirection(direction)
        updateCurrentIndex(i - 1);
        console.log('left the screen:' + deleteDirection)
    };

    const outOfFrame = (name) => {
        console.log(name + ' is out of frame');
    };

    //swipes
    const swipe = async (dir) => {
        if (canSwipe && currentIndex < dawgMatches.length) {
            await childRefs[currentIndex].current.swipe(dir)
        }
    };

    const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
    }

    return (
        <div className="tinderCards">
            <div className="tinderCards__cardContainer">
                {dawgMatches.map((dawg, i) => (
                    <TinderCard
                        ref={childRefs[i]}
                        className='swipe'
                        key={dawg.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, dawg.name, i)}
                        onCardLeftScreen={() => outOfFrame(dawg.name, i)}
                    >
                        <div className='card' style={{ backgroundImage: `url(${dawg.image})` }}>
                            <h1>{dawg.name}</h1>
                            <h2>{dawg.breed}</h2>
                        </div>
                    </TinderCard>
                ))}
            </div>
            <div className="swipeButtons">
                <IconButton className="swipeButtons__left" onClick={() => swipe('left')}>
                    <CloseIcon fontSize="large" />
                </IconButton>
                <IconButton onClick={() => goBack()}>
                    <ReplayIcon fontSize="large" />
                </IconButton>
                <IconButton className="swipeButtons__right" onClick={() => swipe('right')}>
                    <FavoriteIcon fontSize="large" />
                </IconButton>
            </div>
            {lastDirection ? (
                <h2 key={lastDirection} className='infoText'>
                    You swiped {lastDirection}
                </h2>
            ) : (
                <h2 className='infoText'>
                    Swipe a card to see which direction you swiped!
                </h2>
            )}
        </div>
    );
};

export default TindawgCards;