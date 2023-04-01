<template>
	<q-page>
		<div
			class="bg-warning text-white text-center q-pa-md flex flex-center"
			style="height: 100vh"
		>
			<div>
				<div style="font-size: 20vh">403</div>

				<div class="text-h2" style="opacity: 0.4">
					{{ $t("error.page.403") }}
				</div>

				<q-btn
					class="q-mt-xl"
					color="white"
					text-color="blue"
					unelevated
					to="/"
					label="Go Home"
					no-caps
				/>
			</div>
		</div>
	</q-page>
</template>
