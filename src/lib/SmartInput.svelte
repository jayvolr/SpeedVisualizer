<script lang="ts">
  import { Pulse } from 'svelte-loading-spinners'
  interface Props {
    duration: number
    speedKph: number
    id: string
  }

  let { duration, speedKph = $bindable(), id }: Props = $props()

  let subject: string = $state('')
  let speedStr: string = $state('')
  let loading: boolean = $state(false)
  let lastRun: string = ''

  const subjects = [
      'Car', 'Bike', 'Person', 'Plane', 'Train', 'Boat', 'Fighter Jet', 'Rocket', 'Bullet', 'Sound', 'Light',
      'Usain Bolt', 'Cheetah', 'Sonic', 'The Flash', 'Speedy Gonzales', 'Road Runner', 'Speed Racer', 'Speedster',
      'Bullet Train', 'Concorde', 'SR-71 Blackbird', 'F-22 Raptor', 'F-35 Lightning II', 'Peregrine Falcon',
      'Formula 1 Car', 'Bugatti Veyron', 'Koenigsegg Agera RS', 'Hennessey Venom GT', 'Bloodhound SSC', 'Voyager 1',
      'New Horizons', 'Apollo 11', 'Space Shuttle', 'ISS', 'Starship', 'Enterprise', 'Millennium Falcon', 'TIE Fighter',
      'X-Wing', 'Death Star', 'Star Destroyer', 'Borg Cube', 'Warp Drive', 'Hyperdrive', 'Earth\'s Orbit', 'Expansion of The Universe',
      'Goku', 'Superman', 'Thor', 'Hulk', 'Quicksilver', 'Zoom', 'Reverse Flash', 'Savitar', 'Godspeed', 'Black Flash',
      'Sonic the Hedgehog', 'Shadow the Hedgehog', 'Silver the Hedgehog', 'Metal Sonic', 'Amy Rose', 'Tails', 'Knuckles',
      'U-2', 'Land Speed Record', 'Mach 1', 'Mach 2', 'Mach 3', 'Mach 4', 'Mach 5', 'Mach 6', 'Mach 7', 'Mach 8', 'Mach 9', 'Mach 10',
    ]

  async function changed() {
    if (!subject) return
    if (subject === lastRun) return
    loading = true
    lastRun = subject
    const response = await fetch('/api/lookup-speed', {
      method: 'POST', body: subject
    }).then(res => res.text())
    loading = false
    speedKph = formatSpeed(String(response))
    speedStr = speedKph.toLocaleString()
  }

  function formatSpeed(g: string): number {
    return parseFloat(g.replace(/,/g, ''))
  }

  function speedManuallyChanged(event: Event) {
    console.log('speed manually changed')
    speedKph = formatSpeed((event.target as HTMLInputElement).value)
    speedStr = speedKph.toLocaleString()
  }

  function maybeRemoveFocus(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      (event.target as HTMLInputElement)?.blur();
    }
  }

  function pullFocus(el: HTMLInputElement) {
    el.focus()
  }

  function selectAll(event: Event) {
    (event.target as HTMLInputElement).select()
  }

  function getRandomSubject(): string {
    return subjects[Math.floor(Math.random() * subjects.length)]
  }
</script>

<div class="container">
  <span class="id" aria-hidden="true">{id}</span>

  <input
    type="text" bind:value={subject}
    onfocus={selectAll} onblur={changed} onkeyup={maybeRemoveFocus}
    placeholder={`Subject e.g. "${getRandomSubject()}"`} use:pullFocus
    list={`subjects-${id}`}
  />

  {#if subject.length > 2}
    <datalist id={`subjects-${id}`}>
      {#each subjects as subject}
        <option value={subject}>{subject}</option>
      {/each}
    </datalist>
  {/if}
  
  {#if loading}
    <span class="loader-container"><Pulse color="#dbdbdb" size="30" /></span>
  {:else}
    {' •'}   <span><input type="text" onfocus={selectAll} class="speed-input" bind:value={speedStr} onkeyup={maybeRemoveFocus} placeholder="Speed" onchange={speedManuallyChanged} /> KPH</span>
      <span>{duration < Infinity ? `   •   ${duration.toFixed(2)} seconds` : ''}</span>
  {/if}
</div>

<style lang="scss">
  .id {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }

  .container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 10px;
    white-space-collapse: preserve;
  }

  input {
    background: none;
    border: none;
    field-sizing: content;
    text-transform: capitalize;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;

    &::placeholder {
      text-transform: none;
    }
  }

  .speed-input {
    padding: 10px 3px 10px 10px;
    position: relative;
    /* top: 1px; */
  }

  .speed-input:focus {
    padding: 10px;
  }

  .loader-container {
    padding: 10px;
  }
</style>