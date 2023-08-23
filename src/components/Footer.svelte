<script>
    import "../app.scss";
    import FooterIcon from './icons/FooterIcon.svelte';
</script>

<footer>
    <div class="top">
        <div class="container">
            <div class="left">
                <div class="section">
                    <div class="footer-left-content">
                        <div class="footer-logo">
                            <img src="/logoicon.png" alt="Favicon" style="height: 48px; margin-right: 6px;"/>
                            <img src="/logoicontext.png" alt="Logo" style="height: 24px;"/>
                        </div>
                        <p class="footer-all-rights">
                            Justearn.gg | All Rights Reserved
                        </p>
                        <p class="footer-copyright">
                            @ Copyright 2020 - {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </div>

            <div class="right">
                <div class="section about">
                    <p class="footer-section-title">About</p>
                    <div class="footer-section-content">
                        <a href="/blog">Blog</a>
                        <a href="/terms">Terms of Service</a>
                        <a href="/privacy">Privacy Policy</a>
                    </div>
                </div>

                <div class="section support">
                    <p class="footer-section-title">Support</p>
                    <div class="footer-section-content">
                        <a href="/faq">FAQ</a>
                        <a href="/contact">Contact</a>
                        <a href="/chat">Support</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footer-separator"></div>

    <div class="container socials">
        <div class="footer-container-content">
            <div>
                <FooterIcon icon="mdi:twitter" url="https://twitter.com/justearngg" hoverColor="#1d9bf0"/>
                <FooterIcon icon="ri:facebook-fill" url="https://www.youtube.com/@JustEarnGG" hoverColor="#4267b2"/>
                <FooterIcon icon="mdi:instagram" url="https://www.instagram.com/justearngg/" hoverColor="radial-gradient(circle at 30% 107%,#fdf497 0,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285aeb 90%)"/>
                <FooterIcon icon="mdi:reddit" url="https://www.reddit.com/r/Justearn/" hoverColor="#ff5700"/>
                <FooterIcon icon="ic:baseline-discord" url="https://discord.gg/UVTypQSSfK" hoverColor="#7289da"/>
                <FooterIcon icon="simple-icons:trustpilot" url="https://www.trustpilot.com/review/justearn.gg" hoverColor="#007f4e"/>
            </div>
        </div>
    </div>
</footer>

<style lang="scss">
    div.footer-container-content {
        display: flex;
        justify-content: space-between;
        width: 100%;
        max-width: 1200px;

        & > div {
            display: flex;
            gap: 16px;
        }
    }

    div.footer-separator {
        height: 1px;
        background-color: #232121;
    }

    footer {
        background-color: #171515;

        * {
            font-family: Poppins, sans-serif;
        }

        .footer-section-content > a {
            text-decoration: none;

            display: block;
            font-weight: 500;
            font-size: 14px;
            line-height: 160%;
            color: #a9a9ca;

            &:not(:last-child) {
                margin-bottom: 12px;

                @media only screen and (max-width: 700px) {
                    margin-bottom: 8px;
                }
            }
        }

        .footer-section-title {
            font-weight: 500;
            font-size: 18px;
            line-height: 140%;
            letter-spacing: .01em;
            color: #ccd;
            padding: 0;

            height: 28px;
            display: flex;
            align-items: center;

            @media only screen and (max-width: 700px) {
                margin: 0 0 12px 0;
            }
        }

        .about {
            order: 2;
        }

        .support {
            order: 3;

            @media only screen and (max-width: 700px) {
                order: 1;
            }
        }

        .footer-copyright {
            font-weight: 500;
            font-size: 12px;
            line-height: 165%;
            color: rgba(169,169,202,0.6);
            margin: 0;
        }

        .footer-all-rights {
            font-weight: 500;
            font-size: 12px;
            line-height: 165%;
            color: #a9a9ca;
            margin-bottom: 0;
        }

        .footer-logo {
            display: flex;
            align-items: center;
            height: 28px;
        }

        .footer-left-content {
            flex: 2;

            @media only screen and (max-width: 700px) {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }

        .section {
            flex: 1;
            
            @media only screen and (max-width: 700px) {
                margin-top: 24px;
            }
        }

        & > .top {
            background-color: #171515;
            padding: 64px;
            display: flex;
            flex-direction: column;
            align-items: center;

            @media only screen and (max-width: 700px) {
                padding: 24px;
            }
        }

        .container {
            width: 100%;
            max-width: 1200px;
            display: flex;

            &.socials {
                padding: 24px 0;
                margin: 0 auto;
            }

            @media only screen and (max-width: 700px) {
                flex-direction: column;
            }

            & > .left, & > .right {
                display: flex;
                flex: 1;
            }

            & > .left {
                @media only screen and (max-width: 700px) {
                    flex-direction: column;
                    align-items: center;
                }
            }
        }
    }
</style>