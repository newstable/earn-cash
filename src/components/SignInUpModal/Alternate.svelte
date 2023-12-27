<script>
    import "../../app.scss";
</script>

<div class="divider">
    <div/>
    <p>or</p>
    <div/>
</div>

<div class="btns scale-90">
    <a href="/auth/google">
        <img src="/auth-google-logo.png" alt="google logo"/>
        <span>Google</span>
    </a>

    <a href="/auth/steam">
        <img src="/auth-steam-logo.png" alt="steam logo"/>
        <span>Steam</span>
    </a>
</div>

<div class="policies">
    <p>
        General Prohibited Uses Using multiple accounts Completing offers on another user's account Using any type of VPN, VPS or Emulator software.
    </p>
</div>

<style lang="scss">
    @import "../../variables.scss";

    div.btns {
        position: relative;
        display: flex;
        align-items: center;
        gap: 5px;

        & > a {
            position: relative;
            width: 100%;
            background: #5f141e;
            justify-content: space-between;
            padding: 0 .15rem;

            display: flex;
            align-items: center;
            justify-content: center;
            height: 44px;
            column-gap: 10px;
            min-width: 130px;
            color: #e64c4e;
            border-radius: 5px;
            box-shadow: none;
            text-shadow: 0 0 15px #e64c4e;
            text-transform: none;

            text-decoration: none;
            text-align: center;
            letter-spacing: .5px;
            transition: background-color .2s ease-out;
            cursor: pointer;

            font-size: 14px;
            outline: 0;

            border: none;
            line-height: 36px;
            padding: 0 16px;
            vertical-align: middle;
            -webkit-tap-highlight-color: transparent;

            & > img {
                width: 20px;
                border-style: none;
            }

            & > span {
                color: #fff;
                font-weight: 600;
                text-shadow: 0 0 30px rgb(255 255 255 / 50%);
            }
        }
    }

    div.divider {
        display: flex;
        align-items: center;
        margin: .5rem 0;
        

        & > div {
            width: 45%;
            height: 1px;
            background: #e8e9ed;
        }

        & > div:first-child {
            left: 0;
        }

        & > div:last-child {
            right: 0;
        }

         & > p {
            margin: auto;
            color: white;

            text-transform: lowercase;
            font-size: 15px;
         }
    }

    div.policies {
        padding: .5rem 0;

        & > p {
            color: #ffff;
            font-size: 11px;
        }
    }
</style>