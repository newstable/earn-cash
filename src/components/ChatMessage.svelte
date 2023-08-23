<script>
    import "../app.scss";

    export let image = "https://lh3.googleusercontent.com/a/AEdFTp7ZGJSqRYRQemRXgg-EJyoKBRHKRx8QPSkYkOEiApI=s96-c";
    export let level = 955;
    export let username = "Döner Borat (Helal)";
    export let userid = 1;
    export let epochTime = 1674405841;
    export let message = "Ur mom";

    const d = new Date(0);
    d.setUTCSeconds(epochTime);

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var suffix = "AM";
    if (hours > 12) {
        hours -= 12;
        suffix = "PM";
    }
</script>

<div class="chatMessage">
    <div class="chatHeader">
        <img src={image} alt="User profile"/>

        <div class="level">
            {level.toLocaleString()}
        </div>

        <div class="username">
            <a href="/user/{userid}">
                <div class="usernameInner">
                    {username}
                </div>
            </a>
        </div>
    </div>

    <div class="time">
        {hours}:{minutes} {suffix}
    </div>

    <div class="msg">
        {message}
    </div>
</div>

<style lang="scss">
    @import "../variables.scss";

    div.chatMessage {
        padding: 9px;
        margin: 4px 0;
        border-radius: 3px;
        width: 100%;
        background: rgba(44,44,70,0.25);
        display: inline-block;
        text-align: left;

        div.chatHeader {
            display: flex;
            align-items: center;

            img {
                height: 20px;
                width: 20px;
                margin-right: 7px;
                border-radius: 5px;
                float: left;
            }

            .level {
                height: 14px;
                line-height: 14px;
                max-width: 50px;
                padding-left: 9px;
                padding-right: 9px;
                padding-top: 0;
                font-weight: 500;
                font-size: 11px;
                color: rgba(255,255,255,0.8);
                text-align: center;
                border-radius: 2px;
                margin-right: 7px;
                overflow: hidden;
            }

            .username {
                font-weight: 500;
                font-size: 11px;
                display: inline-block;

                a {
                    cursor: pointer;
                    text-decoration: none;

                    div.usernameInner {
                        color: $active-text-color;
                        max-width: 130px;
                        display: block;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }

        div.time {
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 133%;
            text-align: right;
            letter-spacing: -0.03em;
            color: rgba(135,135,202,0.3);
            margin-top: -20px;
            float: right;
        }

        div.msg {
            overflow: hidden;
            word-wrap: break-word;
            font-size: 13px;
            font-weight: 500;
            line-height: 133%;
            color: rgba(135,135,202,0.7);
            margin-left: 0;
            margin-top: 10px;
        }
    }
</style>