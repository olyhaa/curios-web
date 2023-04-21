import React from 'react';
import './gameRules.css';

const GameRules = () => {

  return (
      <div className="rules-container">

          <h2>Goal</h2>
          <span>
              Your goal is to collect Artifacts worth the most points. You'll place your pawns on
              Treasure Sites to claim Artifacts (gems). The value of those Artifacts is hidden until
              the end of the game, but as you play you'll get hints about which locations may yeild
              the best Artifacts. At the end of the game, the player with the most valuable Artifact
              collection wins!
          </span>

          <h2>How to Win</h2>
          <span>
              At the end of the game, the Market card for each Treasure Site is truned face up, revealing
              the value of the Artifacts discovered there: 1, 3, 5, or 7.
          </span>
          <span>
              The object of the game is to have the highest total value of Artifacts.
          </span>
          <span>
              The cards in your hand and those played during the game will help you deduce the value of each
              Artifact so that ou can focus on raiding the most valueable sites - the numbers in your hand will 
              not be the values of the corresponding Artifacts!
          </span>

          <h2>Cards and Artifacts</h2>
          <h3>Treasure Sites</h3>
          <span>
              Treasure Sites are where you obtain Artifacts. Note the columns of spaces for Archaeologist 
              pawns. To claim an Artifact, you need to completely fill the empty column farthest to the left
              with your Archeologist pawns. This allows you to take one Artifact.
          </span>
          <h3>Market Cards</h3>
          <span>
              Each Treasure Site has four corresponding Market cards, numered 1, 3, 5, and 7. The Card
              placed face down above the Treasure Site is the value of each Artifact at that site.
          </span>
          <h3>Artifacts</h3>
          <span>
              Each Treasure Site has corresponding Artifacts (colored gems).
          </span>

          <h2>Playing the Game</h2>
          <span>
              Curios is played over a series of rounds. Each round is divided into two phases: {' '}
              <b>Phase 1: Search for Treasure</b> followed by <b>Phase 2: Recruit Archaeoloists</b>.
          </span>
          
          <h3>Phase 1</h3>
          <h4>Search for Treasure</h4>
          <span>
              In this phase, you have the chance to use your Archaeologist pawns to collect Artifacts from
              the Treasure Sites. Players take turns, until none of them have enough Archaeologist pawns to
              collect any artifacts.
          </span>
          <span>
              On your turn, choose a Treasure Site. You must <b>completely fill</b> the empty column farthest to
              the left on the Treasure Site using your Archaeologist pawns. If you do, you get to take one
              Artifact from below the Treasure Site, if any are available. You cannot place pawns on a Treasure
              Site if all the columns are full.
          </span>
          <span>
              After you've collected your Artifact, the next player begins their turn.
          </span>
          <span>
              If you don't have enough Archaeologist pawns left to fill any of the empty columns, you <b>must</b> pass
              for the rest of the phase. Players continue taking turns until all players have passed.
          </span>

          <h4>Bonus Artifacts</h4>
          <span>
              Once all players have passed, Phase 1 ends. At this point, the player with the most Archaeologist pawns
              at each Treasure Site gets one additional Artifact from that Site, if any are available.
          </span>
          <span>
              If there's a tie, no one gets the bonus Artifact for that Treasure Site.
          </span>

          <h4>Retrieve Archaeologists</h4>
          <span>
              Finally, all players take back all of their Archaeologist pawns from the Treasure Sites to prepare for
              the next round.
          </span>

          <h2>Phase 2</h2>
          <h3>Recruit Treasure Hunters</h3>
          <span>
              Starting with the first player, each player now has the opportunity to recruit another Archaeologist pawn.
          </span>
          <span>
              When it's your turn, you may play one Market card from your hand face up on the table
              in front of you. This will give the other players a clue about the value of the Artifact
              that matches the card you played.
          </span>
          <span>
              If you reval a card, you get an additional Archaeologist pawn of your color. From now on, you'll
              have an additional Archaeologist pawn to place on a Treasure Site each round.
          </span>
          <span>
              If you don't want to reveal a card, you may pass without taking an additional Archaeologist pawn.
          </span>
          <span>
              After all players have had a turn to recruit a new Archaeologist pawn (or pass), Phase 2 and the 
              round are both over. Flip  one of the Market cards from the side deck face up. Pass the first
              player token to the next player and a new round of treasure hunting can begin.
          </span>

          <h2>Ending the Game</h2>
          <span>
              Continue playin, round after round, until <b>two or more Treasure Sites</b> run out of Artifacts.
              The game ends at the end of that round.
          </span>
          <span>
              The Treasure Site cards are revealed, deterining the value for each Artifact of that color. Add up
              the value of all your Artifacts. The player with the highest total wins! If there's a tie, the victory
              is shared.
          </span>
    </div>
  );
};

export default GameRules;
