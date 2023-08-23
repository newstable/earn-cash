<script>
    export let wallUrl = "ayetstudio";
    export let wallName = "Ayet Studios";
    export let logoUrl = "/ayetLogo.webp";
    export let backgroundUrl = "/wall-ayetstudios-card-bg.png";
    export let hasBonus = false;
</script>

<a href="/earn/{wallUrl}">
    <div class="wall">
        <div style="background-image: url({backgroundUrl});">
            <div class="overlay"/>
    
            <div class="action">
                <div class="earn-box-play-button">
                    <img src="/play-offer.svg" alt="Play button"/>
                </div>
                <p class="earn-box-cover-action-text">View offers</p>
            </div>
    
            <a href="/earn/{wallUrl}">
                <div class="below"/>
    
                <div class="above">
                    {#if hasBonus}
                        <div class="bonus">BONUS</div>
                    {/if}
                </div>
                
                <div class="offerWall">
                    <img src={logoUrl} alt="Ayet studios logo"/>
                </div>
            </a>
    
            <p class="wallName">{wallName}</p>
        </div>
    </div>
</a>

<style lang="scss">
    div.wall {
        text-decoration: none;
        cursor: pointer;

        &:hover > div {
            & > div.overlay {
                opacity: 1;
            }
            & > div.action {
                opacity: 1;
            }
        }

        & > div {
            min-width: 20px;
            min-height: 50px;
            background: #222121;
            border-radius: 5px;
            position: relative;
            width: 100%;

            background-size: 100% 100%;

            & > div.overlay {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                display: flex;
                opacity: 0;
                transition: all .3s cubic-bezier(0.4,0,0.2,1);
                backdrop-filter: blur(20px);
                z-index: 2;
            }

            & > div.action {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                display: flex;
                opacity: 0;
                transition: all .3s cubic-bezier(0.4,0,0.2,1);
                align-items: center;
                justify-content: center;
                flex-direction: column;
                z-index: 3;

                & > div.earn-box-play-button {
                    width: 40px;
                    height: 40px;
                    background: rgba(255,90,92,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 10px;
                    border-radius: 50%;
                }

                & > p.earn-box-cover-action-text {
                    margin: 0;
                    color: white;
                    font-size: 12px;
                    font-weight: 500;
                }
            }

            & > a {
                display: flex;
                transition: all .3s cubic-bezier(0.4,0,0.2,1);
                text-decoration: none;

                & > div.offerWall {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    & > img {
                        width: 80%;
                        max-height: 60px;
                        object-fit: contain;
                        vertical-align: bottom;
                    }
                }

                & > div.below {
                    flex: 1;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: end;
                    min-height: 230px;
                }

                & > div.above {
                    background: #292c46;

                    & > div.bonus {
                        position: absolute;
                        top: 12px;
                        right: 12px;
                        background: rgba(255,90,92,0.2);
                        border-radius: 12px;
                        padding: 2px 10px;
                        font-weight: 500;
                        font-size: 12px;
                        color: #ff5a5c;
                    }
                }
            }

            & > p.wallName {
                font-size: 14px;
                font-weight: 500;
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                bottom: 16px;
                color: #fff;
                text-align: center;
                z-index: 2;
            }
        }
    }
</style>