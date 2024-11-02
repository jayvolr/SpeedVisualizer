<script lang="ts">
  import { Pulse } from 'svelte-loading-spinners'
  import subjects from '/src/assets/subjects'

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