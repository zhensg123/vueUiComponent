<template>
    <div class="unit-link">
        <unitProgress :percentage="50"></unitProgress>
<unitProgress :percentage="100" status="success"></unitProgress>
<unitProgress :percentage="100" status="warning"></unitProgress>
<unitProgress :percentage="50" status="exception"></unitProgress>

    </div>
  </template>