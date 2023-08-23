<script>
    import "../../../app.scss";
    import FaqItem from "./FaqItem.svelte";
</script>

<div class="faq">
    <h2>FAQ</h2>

    <FaqItem question="How to make money on Justearn?">
        Justearn.com works together with companies that want to advertise their apps, surveys and products.<br />
        A task could be: Download an app and reach level 5 within 2 days to earn 4000 coins.<br />
        To get started choose an offer or survey. We can recommend the featured offers at the top of the <a href="/earn">Earn</a> page. These tasks are very simple and many people have already successfully completed them in the past.<br />
        <br />
        After you have completed a task you will get coins. 1000 coins equal $1.00. You can cashout the coins for PayPal, VISA cards, Bitcoin, CS:GO Skins, Amazon gift cards and multiple other types of gift cards.
    </FaqItem>

    <FaqItem question="How is Justearn able to pay users?">
        <ol>
            <li>
                <h6>Users complete tasks from advertisers</h6>
                Advertisers provide various tasks for users, including downloading an app, signing up for a website, watching videos, reaching a certain in-game level and much more.
            </li>
            <li>
                <h6>Advertisers pay Justearn for promotion</h6>
                For every completed task, advertisers pay Justearn a commission.
            </li>
            <li>
                <h6>Justearn sends user payouts</h6>
                After completing all task requirements, Justearn will send the user a payout.
            </li>
        </ol>
    </FaqItem>

    <FaqItem question="How much money can you really earn on Justearn?">
        It is easily possible to earn more than $100 per month on Justearn, some users even reach $1000+ each month. You can check out the <a href="/leaderboard">Leaderboard</a> to see how much the most active Justearn users earn.
    </FaqItem>

    <FaqItem question="How long does it take to cash out your money?">
        Justearn.com has a live support that is always online. Our team is working 24/7 and you can contact us any time at the top of the chat. If you request a withdrawal, it will most likely get approved in less than 2 minutes.
    </FaqItem>
</div>

<style lang="scss">
    div.faq {
        width: 100%;
        background: #171515;
        padding: 60px 0;

        @media only screen and (max-width: 700px) {
            padding: 52px 15px;
        }

        & > h2 {
            font-weight: 600;
            font-size: 30px;
            text-align: center;
            margin-bottom: 35px;
            letter-spacing: -0.03em;

            @media only screen and (max-width: 700px) {
                font-size: 20px;
                margin-bottom: 20px;
            }
        }
    }

    a {
        text-decoration: underline;
        color: #fff;
        font-weight: 700;
    }

    ol {
        padding-left: 60px;
        margin-top: 50px;

        & > li {
            position: relative;
            counter-increment: requirements-counter;
            list-style: none;
            margin-left: 30px;
            margin-bottom: 20px;

            &::before {
                content: counter(requirements-counter);
                color: #ff5a5c;
                position: absolute;
                left: -45px;
                top: -15px;
                font-size: 48px;
                font-weight: bold;
                text-align: right;
                width: 30px;
            }
        }
    }

    h6 {
        color: #ff5a5c;
        font-weight: bold;
        font-size: 14px;
        line-height: 110%;
        margin: 0.7666666667rem 0 0.46rem 0;
    }
</style>