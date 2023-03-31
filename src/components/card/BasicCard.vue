<template>
	<q-card :class="[$q.dark.isActive ? 'no-shadow' : '', 'card']">
		<slot></slot>
	</q-card>
</template>

<style scoped>
.card {
	border-radius: 24px;
}
</style>
