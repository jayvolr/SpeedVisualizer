<script lang="ts">
  interface Props {
    name: string;
    length: number;
    speed: number;
    running: boolean;
  }
  let { name, length, speed, running }: Props = $props()
  let speedMps: number = $derived(speed * (5/18));
  let duration: number = $derived(length / speedMps);
  let cssVars: string = $derived(`
    --duration: ${running ? `${duration}s` : '0s'};
    --left: ${running ? '100%' : '0'};
  `);
</script>

<div class="track">
  <div class="runner" style={cssVars}></div>
  <span>{name}  •  {speed.toLocaleString()} KPH  •  {duration.toFixed(1)} seconds</span>
</div>

<style lang="scss">
  .track {
    margin: 60px auto 90px;
    width: 100%;
    height: 4px;
    background-color: #1a1a1a;
    border-radius: 4px;
    position: relative;

    span {
      white-space: pre;
      position: relative;
      top: 20px;
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
</style>
