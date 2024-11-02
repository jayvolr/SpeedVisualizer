<script lang="ts">
  import Track from './lib/Track.svelte'

  let running: boolean = $state(false)
  let length: number = $state(400)
  function run() { running = !running }
</script>

<main>
  <div class="header">
    <img src="/speed.svg" class="logo" alt="Speed Icon" />
    <h1>Speed Visualizer</h1>
  </div>

  <h2>{length.toLocaleString()} meters</h2>

  <Track name="McLaren W1" speed={350} {length} {running} />
  <Track name="Cheetah" speed={120} {length} {running} />
  <Track name="Usain Bolt" speed={44} {length} {running} />

  <button onclick={run} class="run-btn">
    <img src={`/${running ? 'reset' : 'play'}.svg`} class="logo" alt="Play Icon" />
    <div>{running ? 'Reset' : 'Play'}</div>
  </button>
</main>

<style lang="scss">
  .header {
    display: flex;
    flex-direction: row;
    height: 100px;
    gap: 50px;

    h1 {
      margin: 0;
    }
  }

  .run-btn {
    display: flex;
    flex-direction: row;
    gap: 7px;
    align-items: center;
    justify-content: center;
    width: 200px;
    margin: 0 auto;
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
</style>
