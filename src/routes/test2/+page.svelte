<script>
    import Dialog from "$lib/Dialog.svelte";
</script>

    <Dialog
        title="Custom Dialog"
        content="This is a customized dialog. ETES  VOUS VRAOIENT SUR"
        acceptLabel="Agree"
        refuseLabel="Disagree"
        onAccept={() => alert('Accepted!')}
        onRefuse={() => alert('Refused!')}
    />
  