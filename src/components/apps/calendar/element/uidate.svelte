<script>
    import {
        onMount
    } from 'svelte';
    import '@fullcalendar/core/vdom';
    import FullCalendar from 'svelte-fullcalendar';
    import daygridPlugin from '@fullcalendar/daygrid';
    import timegridPlugin from '@fullcalendar/timegrid';
    import interactionPlugin from '@fullcalendar/interaction';

    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    let options = {
        plugins: [daygridPlugin, timegridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        selectable: true,
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        headerToolbar: {
            left: 'prev',
            center: 'title',
            right: 'next'
        },
        height: '100%',
        weekends: true,
        showNonCurrentDates: false,
        contentHeight: 'auto',
        dateClick: (info) => {
            let daySiblings = info.dayEl.closest('tbody').querySelectorAll('.fc-daygrid-day');
            daySiblings.forEach((el) => {
                el.classList.remove('fc-day_selected');
            });
            info.dayEl.classList.add('fc-day_selected');
        },
        dayHeaderContent: function (arg) {
            return dayNames[arg.date.getDay()];
        }
    };

    onMount(() => {
        setTimeout(() => {
            let dayEvents = document.querySelectorAll('.fc-daygrid-day-events');
            dayEvents.forEach((el) => {
                el.querySelector('.fc-daygrid-event-harness') === null && (el.style.display =
                    'none');
            });
        }, 0);
    });
</script>

<FullCalendar {options} class="date-picker__calendar" />


<style lang="scss">
    :global {
        @import '../../../../../assets/sass/mixins/media-queries';
        @import '../../../../../assets/sass/mixins/functions';
        @import '../../../../../assets/sass/components/calendar';

        .date-picker {
            padding: 4px 24px 0 25px;
            display: flex;
            align-items: center;
            justify-content: center;

            @include minLg {
                min-height: 350px;
            }

            .date-picker__calendar {
                .fc-daygrid-body {
                    width: 100% !important;
                }

                table {
                    width: 100% !important;

                    thead {
                        th {
                            width: 40px;
                            height: 40px;
                            font-size: 13px;
                            font-weight: 500;
                            color: var(--color-gray);

                            @include ssm {
                                width: 28px;
                                height: 28px;
                            }

                            .fc-scrollgrid-sync-inner {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }
                    }

                    tbody {
                        td {
                            a {
                                border-radius: 6px;
                                width: 40px;
                                height: 40px;
                                color: var(--color-gray);
                                font-size: 13px;
                                font-weight: 400;
                                margin: 0;
                                padding: 0;
                                display: flex;
                                align-content: center;
                                justify-content: center;
                                flex-direction: column;
                                margin: 2px 0 0 0;

                                @include ssm {
                                    width: 28px;
                                    height: 28px;
                                }
                            }
                        }
                    }
                }

                .fc-scroller {
                    -ms-overflow-style: none;
                    /* Internet Explorer 10+ */
                    scrollbar-width: none;

                    &::-webkit-scrollbar {
                        display: none;
                        /* Safari and Chrome */
                    }
                }

                .fc {
                    .fc-daygrid-body-natural {
                        .fc-daygrid-day-events {
                            display: none;
                        }
                    }

                    .fc-daygrid-day-top {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }

                .fc-theme-standard {

                    td,
                    th {
                        border: 0 none;
                    }

                    .fc-scrollgrid {
                        border: 0 none;
                    }
                }

                .fc {
                    .fc-day-disabled {
                        background: none;
                    }

                    .fc-toolbar {
                        justify-content: center;
                        margin-top: 4px;
                        margin-bottom: 14px !important;

                        .fc-button.fc-prev-button,
                        .fc-button.fc-next-button {
                            border: 0 none;
                        }
                    }

                    .fc-daygrid-day-top {
                        text-align: center;
                        display: block;
                        margin-bottom: 0;
                    }
                }

                .fc-view {
                    .fc-col-header {
                        background: none;

                        tr th {
                            border: 0 none;
                        }
                    }
                }

                table.fc-scrollgrid thead .fc-scroller-harness .fc-scroller {
                    background: none;
                }

                .fc-daygrid-day.fc-day-today {
                    border-top: 0 none;
                    background: none !important;

                    .fc-daygrid-day-number {
                        background: var(--color-primary);
                        color: #fff !important;
                    }
                }

                .fc-daygrid-day.fc-day_selected {
                    .fc-daygrid-day-number {
                        border: 1px solid var(--color-primary);
                        color: var(--color-primary) !important;
                    }

                    .fc-highlight {
                        background: none;
                    }
                }
            }
        }
    }
</style>