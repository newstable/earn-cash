<script>
    import { onMount } from "svelte";
  	import { goto } from "$app/navigation";
	import validation from "$lib/validation";
	import { Styles } from 'sveltestrap';
	import {
		Card,
		CardHeader,
		CardBody,
		Row,
		Col,
		Form,
		Input,
		Label,
		Button,
		FormGroup
	} from 'sveltestrap';
    export var data;

	onMount(() => {
		if(!data.email)
			goto("/");
	});

	let passwordValidated = 0;
	let password = "";
	let confirm_password = "";

	const validate = (e = null) => {
		if (validation.password(password)) {
			passwordValidated = 1;
		} else {
			passwordValidated = -1;
		}
	};
	
	const handleSubmit = async (event) => {
		event.preventDefault()
		if (!(passwordValidated == 1 && password == confirm_password))
			return
		const formData = new FormData(event.target);
		const paramData = {
			email: data.email,
			password: formData.get('password')
		}
		const response = await fetch('/api/user/update/password', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(paramData),
		});

		if (response.ok) {
			const data = await response.json();
			alert("Success resetting password.")
			console.log('Login successful:', data);
		} else {
			alert("Failed resetting password.")
			console.error('Login failed:', response.status, response.statusText);
		}
	}
</script>
<Styles />
<svelte:head>
	<style>
		.card {
			border-radius: 0;
			background-color: #232121;
			color: white;
		}
		.card-body {
			padding: 1rem 2rem;
		}
		.form-label {
			font-size: 14px;
		}
	</style>
</svelte:head>
<style lang="scss">
	@import "../../../../variables.scss";
    .reset-password__title {
        text-align: center;
        h2 {
            margin-bottom: 0;
        }
        span {
            font-size: 14px;
        }
    }
	.button-group {
		text-align: center;
	}
	input {
		// outline: none;
		height: 3rem;
		font-size: 16px;
		margin: 0 0 8px 0;
		box-shadow: none;
		box-sizing: content-box;
		transition: box-shadow 0.3s, border 0.3s, -webkit-box-shadow 0.3s;

		background: $darkest-background-color;
		padding: 0 1rem;
		width: calc(100% - 2rem);
		margin-top: 0.75rem;
		color: $alt-navbar-color;

		overflow: visible;
			line-height: 1.15;

		&::placeholder {
			color: $alt-background-color;
		}

		&:focus + label {
			color: #ff5a5c;
		}

		&.valid {
			border-bottom: 1px solid #4caf50;
			-webkit-box-shadow: 0 1px 0 0 #4caf50;
			box-shadow: 0 1px 0 0 #4caf50;
		}
		&.invalid {
			border-bottom: 1px solid #f44336;
			-webkit-box-shadow: 0 1px 0 0 #f44336;
			box-shadow: 0 1px 0 0 #f44336;
		}
	}
	div.error {
		background: #eb4634;
		padding: 5px 7px;
		margin-bottom: 8px;
		font-size: 12px;
		border-radius: 5px;
	}
</style>
<div class="edit-profile mt-25">
	<Card>
		<CardHeader class="px-sm-25 px-3">
			<div class="reset-password__title">
				<h4>Reset password</h4>
				<span>Please enter your new password</span>
			</div>
		</CardHeader>
		<CardBody>
			<Row class="justify-content-center">
				<Col xxl={6}>
					<Form on:submit = {handleSubmit}>
						<FormGroup class="mb-20">
							<Label for="new-pw">New password</Label>
							<input
								type="password"
								class="form-control"
								id="new-pw"
								class:valid={passwordValidated == 1}
								class:invalid={passwordValidated == -1 && password.length}
								on:keyup={validate}
								bind:value={password}
							/>
						</FormGroup>
						<FormGroup class="mb-1">
							<Label for="confirm-pw">Confirm password</Label>
							<input
								type="password"
								class="form-control"
								id="confirm-pw"
								name="password"
								class:valid={password == confirm_password && confirm_password.length}
								class:invalid={password != confirm_password && confirm_password.length}
								bind:value={confirm_password}
							/>
						</FormGroup>
						{#if ((passwordValidated == -1 && password.length) || (password != confirm_password && confirm_password.length))}
							<div class="error">
								{
									passwordValidated == -1
										? "Required minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
										: "Confirm password is incorrect."
								}
							</div>
						{/if}
						<div class="button-group pt-45 mb-35">
							<Button type="submit" color="info">
								Update Password
							</Button>
						</div>
					</Form>
				</Col>
			</Row>
		</CardBody>
	</Card>
</div>