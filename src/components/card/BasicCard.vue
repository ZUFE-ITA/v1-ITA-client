<template>
	<q-card :class="$q.dark.isActive ? 'no-shadow' : ''">
		<slot></slot>
	</q-card>
</template>
