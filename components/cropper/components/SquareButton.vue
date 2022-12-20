<template>
	<div class="square-button" @click="$emit('click', $event)" v-bind="$attrs">
		<slot />
	</div>
</template>

<style>
.square-button {
    color: white;
	 background: rgba(0, 0, 0, 0.4);
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 height: 42px;
	 width: 42px;
	 margin-bottom: 10px;
	 cursor: pointer;
	 transition: background 0.5s;
}
 .square-button:hover {
	 background: black;
}
</style>
