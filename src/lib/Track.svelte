<script lang="ts">
  import SmartInput from "./SmartInput.svelte";

  interface Props {
    distance: number;
    running: boolean;
    id: string;
    removeCallback: (id: string) => void;
  }

  let { distance, running, id, removeCallback }: Props = $props()

  let speedKph: number = $state(0)
  let speedMps: number = $derived(speedKph * (5/18))
  let duration: number = $derived(distance / speedMps)
  let cssVars: string = $derived(`
    --duration: ${running ? `${duration}s` : '0s'};
    --left: ${running ? '100%' : '0'};
  `);
</script>

<div class="track">
  <div class="runner" style={cssVars}></div>
  <SmartInput {duration} bind:speedKph />
  <span class="btn-container">
    <button class="remove-btn" onclick={() => removeCallback(id)}>
      <img src="/x.svg" alt="Remove Icon" />
      {id}
    </button>
  </span>
</div>

<style lang="scss">
  .track {
    margin: 60px auto 90px;
    width: 100%;
    height: 4px;
    background-color: #1a1a1a;
    border-radius: 4px;
    position: relative;

    &:hover .remove-btn {
      opacity: 1;
    }
  }

  .runner {
    width: 20px;
    height: 20px;
    background-color: #dadada;
    border-radius: 50%;
    position: absolute;
    top: -8px;
    left: var(--left);
    transition: left var(--duration) linear;
  }

  .btn-container {
    position: absolute;
    top: -43px;
    right: -115px;
    padding: 30px 50px 30px 210px;
  }

  .remove-btn {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    padding: 0;
    transition: all 0.25s;
    opacity: 0;

    &:hover {
      border-color: rgb(222, 75, 75);
    }

    img {
      width: 60%;
      height: 60%;
      position: relative;
      top: 3px;
      filter: invert(1);
    }
  }
</style>
