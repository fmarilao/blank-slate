import React, { useContext, useState } from 'react';
import './Principal.css';
import Modal from '@mui/material/Modal';
import firebase from 'firebase/app';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FirestoreContext from '../context/FirestoreContext';
import PlayerContext from '../context/PlayerContext';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const avatars = [
  'https://robohash.org/sitquibusdamautem.png?size=100x100&set=set1',
  'https://robohash.org/assumendauttempore.png?size=100x100&set=set1',
  'https://robohash.org/evenietquosvoluptatem.png?size=100x100&set=set1',
  'https://robohash.org/suntnequefugiat.png?size=100x100&set=set1',
  'https://robohash.org/quicorporistenetur.png?size=100x100&set=set1',
  'https://robohash.org/repellatiustodolore.png?size=100x100&set=set1',
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  textAlign: 'center',
  p: 4,
  '& h2': { mb: 5 },
  '& button': { mt: 5 }
};

function Principal() {
  const [avatar, setAvatar] = useState(avatars[Math.floor(Math.random() * avatars.length)]);
  const [user, setUser] = useState();
  const [gameId, setGameId] = useState();
  const { db, setJoinedGameId } = useContext(FirestoreContext);
  const { setUsername } = useContext(PlayerContext);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const startGame = async () => {
    const res = await db
      .collection('games')
      .add({
        players: [{ username: user, avatar, creator: true }],
        started: false,
        rounds: [],
      });
    setUsername(user);
    setJoinedGameId(res.id);
  };

  const joinGame = async () => {
    const res = await db.collection('games').doc(gameId).get();
    const inGame = res.data().players.find((player) => player.username === user);
    if (res.exists) {
      if (!inGame) {
        await db
          .collection('games')
          .doc(gameId)
          .update({
            players: firebase.firestore.FieldValue.arrayUnion({
              username: user, avatar, creator: false,
            }),
          });
      }
      setUsername(user);
      setJoinedGameId(gameId);
    } else {
      alert('Invalid Game Id');
    }
  };

  return (
    <div className="App">
      <div className="Wrapper">
        <img src={avatar} alt="avatar" onClick={() => setOpen(true)} />
        <Button variant="contained" onClick={handleOpen}>Change</Button>
      </div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="username" variant="outlined" onChange={(e) => setUser(e.target.value)}/>
        </Box>
      <Box sx={{ '& button': { mb: 15 } }}>
      <Button variant="contained" onClick={() => startGame()}>New Game</Button>
      </Box>
      <Stack direction="column" spacing={2}>
      <Button variant="contained" onClick={() => joinGame()}>Join Game</Button>
      <TextField id="outlined-basic" label="game id" variant="outlined" onChange={(e) => setGameId(e.target.value)}/>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" >
          Select your avatar
          </Typography>
        <div>
          {avatars.map((avatarMap) => (
            <img
              key={avatarMap}
              className={avatarMap === avatar ? 'Selected' : null}
              src={avatarMap}
              alt="avatar"
              onClick={() => {
                setAvatar(avatarMap);
              }}
            />
          ))}
        </div>
        <Button variant="contained" onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Principal;
