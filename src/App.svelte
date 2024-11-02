<script lang="ts">
  import Track from './lib/Track.svelte'
  import Distance from './lib/Distance.svelte';
  import { v4 as uuid } from 'uuid'

  let running: boolean = $state(false)
  let distance: number = $state(400)
  let tracks: string[] = $state([uuid()])

  function run() { running = !running }

  function add() {
    tracks = [...tracks, uuid()]
  }

  function remove(id: string) {
    console.log('removing', id)
    tracks = tracks.filter(t => t !== id)
  }
</script>

<main>
  <div class="header">
    <img src="/speed.svg" alt="Speed Icon" />
    <h1>Speed Visualizer</h1>
  </div>

  <Distance bind:distance />
  
  {#each tracks as id}
    <Track {distance} {running} {id} removeCallback={remove} />
  {/each}

  <div class="buttons-container">
    <button onclick={run} class="run-btn">
      <img src={`/${running ? 'reset' : 'play'}.svg`} alt="Play Icon" />
      <div>{running ? 'Reset' : 'Play'}</div>
    </button>

    <button onclick={add} class="add-btn" disabled={running}>
      <img src="/add.svg" alt="Add Icon" />
      <div>Add</div>
    </button>
  </div>
</main>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: row;
    height: 100px;
    gap: 30px;

    h1 {
      margin: 0;
    }

    img {
      position: relative;
      bottom: 20px;
    }
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
  }

  .run-btn, .add-btn {
    transition: all 0.25s;
    display: flex;
    flex-direction: row;
    gap: 7px;
    align-items: center;
    justify-content: center;
    width: 250px;
    font-weight: 700;

    img, div {
      position: relative;
      right: 5px;
    }

    img {
      height: 25px;
      width: 20px;
      top: 2px;

      @media (prefers-color-scheme: dark) {
        filter: invert(1);
      }
    }
  }

  .add-btn {
    width: 150px;
    /* background-color: #75d766; */

    &:hover:not(:disabled) {
      border-color: #44ce60d7;
    }

    &:disabled {
      background-color: #1a1a1a;
      cursor: not-allowed;

      img {
        opacity: 0.2;
      }
    }
  }
</style>
