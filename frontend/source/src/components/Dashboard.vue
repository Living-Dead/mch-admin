<template>
  <div class="dashboard">
    <v-container
      fluid
      tag="section"
      class="pb-10">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4">
          <v-card
            class="mt-4 mx-auto"
            width="100%"
            height="100%"
          >
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="cyan"
              elevation="12"
              max-width="calc(100% - 32px)"
            >
              <v-sparkline
                :labels="labels"
                label-size="10"
                :value="value"
                color="white"
                line-width="2"
                padding="16"
                auto-draw
                height="185px"
              ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="text-h6 font-weight-light mb-2">
                User Registrations
              </div>
              <div class="subheading font-weight-light grey--text">
                Last Campaign Performance
              </div>
              <v-divider class="my-2"></v-divider>
              <v-icon
                class="mr-2"
                small
              >
                mdi-clock
              </v-icon>
              <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="page-view">
          <v-card
            class="mt-4 mx-auto"
            width="100%"
            height="100%"
          >
            <v-sheet
              class="v-sheet--offset mx-auto"
              color="green"
              elevation="12"
              max-width="calc(100% - 32px)"
            >
              <v-sparkline
                :labels="labels"
                label-size="10"
                :value="value"
                color="white"
                line-width="16"
                padding="16"
                auto-draw
                height="185px"
                type="bar"
              ></v-sparkline>
            </v-sheet>

            <v-card-text class="pt-0">
              <div class="text-h6 font-weight-light mb-2">
                <span> Page view </span>
              </div>
              <div class="subheading font-weight-light grey--text">
                Last Campaign Performance
              </div>
              <v-divider class="my-2"></v-divider>
              <v-icon
                class="mr-2"
                small
              >
                mdi-clock
              </v-icon>
              <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4">
          <BaseMaterialChartCard
            :data="dataCompletedTasksChart.data"
            :options="dataCompletedTasksChart.options"
            color="info"
            type="Line"
          >
            <template v-slot:reveal-actions>
              <v-tooltip bottom>
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                    v-bind="attrs"
                    color="info"
                    icon
                    v-on="on"
                  >
                    <v-icon
                      color="info"
                    >
                      mdi-refresh
                    </v-icon>
                  </v-btn>
                </template>

                <span>Refresh</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ attrs, on }">
                  <v-btn
                    v-bind="attrs"
                    light
                    icon
                    v-on="on"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>

                <span>Change Date</span>
              </v-tooltip>
            </template>

            <h3 class="card-title font-weight-light mt-2 ml-2">
              Completed Tasks
            </h3>

            <p class="d-inline-flex font-weight-light ml-2 mt-1">
              Last Last Campaign Performance
            </p>

            <template v-slot:actions>
              <v-icon
                class="mr-1"
                small
              >
                mdi-clock-outline
              </v-icon>
              <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
            </template>
          </BaseMaterialChartCard>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      class="mt-10 pb-10"
      fluid
      tag="section">
      <v-row>
        <v-col
          cols="12"
          lg="3"
        >
          <BaseMaterialStatsCard
            color="primary"
            icon="mdi-poll"
            title="Website Visits"
            value="75.521"
            sub-icon="mdi-tag"
            sub-text="Tracked from Google Analytics"
          />
        </v-col>

        <v-col
          cols="12"
          lg="3"
        >
          <BaseMaterialStatsCard
            color="orange"
            icon="mdi-sofa"
            title="Bookings"
            value="184"
            sub-icon="mdi-alert"
            sub-icon-color="red"
            sub-text="Get More Space..."
          />
        </v-col>

        <v-col
          cols="12"
          lg="3"
        >
          <BaseMaterialStatsCard
            color="orange"
            icon="mdi-sofa"
            title="Bookings"
            value="184"
            sub-icon="mdi-alert"
            sub-icon-color="red"
            sub-text="Get More Space..."
          />
        </v-col>

        <v-col
          cols="12"
          lg="3"
        >
          <BaseMaterialStatsCard
            color="orange"
            icon="mdi-sofa"
            title="Bookings"
            value="184"
            sub-icon="mdi-alert"
            sub-icon-color="red"
            sub-text="Get More Space..."
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container
      class="mt-10 pb-10"
      fluid
      tag="section">
      <v-row>
        <v-col
        cols="12"
        md="6"
      >
        <BaseMaterialCard
          color="warning"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Employees Stats
            </div>

            <div class="subtitle-1 font-weight-light">
              New employees on 15th September, 2016
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
            />
          </v-card-text>
        </BaseMaterialCard>
      </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang='scss'>
  .dashboard {

    .v-sheet--offset {
      top: -30px;
      position: relative;
    }

    .v-sheet--offset {
      color:  rgba(255, 255, 255, .7) !important;
      padding: 16px;
    }
  }
</style>

<script>

  export default {
    data: () => ({
      labels: [
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],
      value: [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id',
        },
        {
          sortable: false,
          text: 'Name',
          value: 'name',
        },
        {
          sortable: false,
          text: 'Salary',
          value: 'salary',
          align: 'right',
        },
        {
          sortable: false,
          text: 'Country',
          value: 'country',
          align: 'right',
        },
        {
          sortable: false,
          text: 'City',
          value: 'city',
          align: 'right',
        },
      ],
      items: [
        {
          id: 1,
          name: 'Dakota Rice',
          country: 'Niger',
          city: 'Oud-Tunrhout',
          salary: '$35,738',
        },
        {
          id: 2,
          name: 'Minerva Hooper',
          country: 'Curaçao',
          city: 'Sinaai-Waas',
          salary: '$23,738',
        },
        {
          id: 3,
          name: 'Sage Rodriguez',
          country: 'Netherlands',
          city: 'Overland Park',
          salary: '$56,142',
        },
        {
          id: 4,
          name: 'Philip Chanley',
          country: 'Korea, South',
          city: 'Gloucester',
          salary: '$38,735',
        },
        {
          id: 5,
          name: 'Doris Greene',
          country: 'Malawi',
          city: 'Feldkirchen in Kārnten',
          salary: '$63,542',
        },
      ],
      dataCompletedTasksChart: {
        data: {
          labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [
            [230, 750, 450, 300, 280, 240, 200, 190],
          ],
        },
        options: {
          lineSmooth: true,
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
    }),
  };
</script>