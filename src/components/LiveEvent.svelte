<script>
    import "../app.scss";

    export let userid = 0;
    export let image = "https://eu.ui-avatars.com/api/?background=302f2f&color=ff5a5c&length=1&name=Justsayjim";
    export let amount = 6935;
    export let username = "Justsayjim";
    export let wall = "ayet studios";

    const imageLoadError = e => {
        e.target.src = "https://eu.ui-avatars.com/api/?background=302f2f&color=ff5a5c&length=1&name=" + username;
    }
</script>

<div class="event">
    <a href="/user/{userid}">
        <img src={image} alt="profile" on:error={imageLoadError}/>

        <div class="mid">
            <div>{wall.toUpperCase()}</div>
            <div class="user">{username}</div>
        </div>

        <div class="amount">
            {amount.toLocaleString()}
            <span class="bar"/>
        </div>
    </a>
</div>

<style lang="scss">
    @import "../variables.scss";

    div.event {
        background: #1d1c1c;
        padding: 0;
        border-radius: 5px;
        overflow: hidden;
        color: black;
        height: 39px;
        align-items: center;
        margin-right: 5px;
        cursor: pointer;
        user-select: none;
        
        a {
            display:flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            padding: 10px;

            text-decoration: none;
            
            img {
                height: 26px;
                border-radius: 3px;
                margin-right: 10px;
            }

            div.mid {
                max-width: 80px;
                min-width: 50px;
                margin-right: 10px;
                letter-spacing: -0.03em;
                font-weight: 500;

                & > div {
                    color: rgba(101,103,141,0.7);
                    font-size: 10px;
                    position: relative;
                    top: 2px;

                    display: block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    &.user {
                        color: #65678d;
                        font-size: 12px;
                        top: -1px;
                    }
                }
            }

            div.amount {
                color: $active-color;
                font-size: 11px;
                background: #2f2e2e;
                border-radius: 2px;
                padding: 3px 5px 3px 10px;
                font-weight: 500;
                display: flex;
                align-items: center;

                span.bar {
                    display: inline-block;
                    width: 2px;
                    height: 12px;
                    background: #ff5a5c;
                    border-radius: 20px;
                    margin-left: 7px;
                }
            }
        }
    }
</style>