<script lang="ts">
  interface Props {
    distance: number
  }
  let { distance = $bindable() }: Props = $props()

  function selectAll(event: Event) {
    (event.target as HTMLInputElement).select()
  }

  function maybeRemoveFocus(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      (event.target as HTMLInputElement)?.blur();
    }
  }
</script>

<h2>
  <input type="number" bind:value={distance} placeholder="Distance" onclick={selectAll} onkeyup={maybeRemoveFocus} /> meters
</h2>

<style lang="scss">
  h2 {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 20px 0;

    input {
      background: none;
      border: none;
      field-sizing: content;
      text-transform: capitalize;
      padding: 10px 0;
      cursor: pointer;
      font-size: 24px;
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      font-weight: 700;
      position: relative;
      top: 1px;
      color: rgba(255, 255, 255, 0.87);

      &:focus {
        padding: 10px;
      }
    }
  }
</style>