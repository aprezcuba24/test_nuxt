<template>
  <div>
    <full-calendar @event-created="addEvent" @event-selected="editEvent" :events="events" />
    <b-modal ref="modal" :title="$t('modal_title')">
      <b-form>
        <b-form-group id="input-group-1" :label="$t('lb_title')" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.title"
            :placeholder="$t('ph_title')"
            type="text"
            required
          />
        </b-form-group>
        <b-form-group :label="$t('lb_contact')">
          <b-form-select v-model="form.contactId" :options="contactOptions" />
        </b-form-group>
      </b-form>
      <b-button
        @click="removeEvent"
        class="bt_remove"
        variant="danger"
        size="sm"
      >{{ $t('bt_remove') }}</b-button>
    </b-modal>
  </div>
</template>

<script>
import "fullcalendar/dist/fullcalendar.css";

export default {
  data() {
    return {
      events: [],
      form: {}
    };
  },
  computed: {
    contactOptions() {
      return this.contacts.map(item => ({
        value: item._id,
        text: item.name
      }));
    }
  },
  async asyncData({ store }) {
    const contacts = await store.dispatch("contact/list");
    const events = await store.dispatch("event/list");
    return { contacts, events };
  },
  methods: {
    editEvent(event) {
      this.form = {
        _id: event._id,
        title: event.title,
        contactId: event.contactId,
        start: event.start,
        end: event.end
      };
      this.$refs.modal.show();
      this.$refs.modal.$once("ok", async () => {
        this.events = this.events.filter(item => item._id != event._id);
        this.events.push(
          await this.$store.dispatch(
            "event/update",
            JSON.parse(JSON.stringify(this.form))
          )
        );
      });
      this.$refs.modal.$once("cancel", () => {
        this.$refs.modal.$off("ok");
      });
    },
    async removeEvent() {
      await this.$store.dispatch("event/remove", { _id: this.form._id });
      this.events = this.events.filter(item => item._id != this.form._id);
      this.$refs.modal.hide();
      this.$refs.modal.$off("ok");
    },
    addEvent(e) {
      this.form = {};
      this.$refs.modal.show();
      this.$refs.modal.$once("ok", async () => {
        const event = JSON.parse(
          JSON.stringify({
            ...this.form,
            ...{
              start: e.start.toDate(),
              end: e.end.toDate(),
              allDay: e.allDay
            }
          })
        );
        this.events.push(await this.$store.dispatch("event/create", event));
      });
      this.$refs.modal.$once("cancel", () => {
        this.$refs.modal.$off("ok");
      });
    }
  }
};
</script>

<i18n>
{
  "en": {
    "modal_title": "Event",
    "lb_title": "Title",
    "ph_title": "Title ot the event.",
    "lb_contact": "Contact",
    "bt_remove": "Remove"
  }
}
</i18n>

<style>
.bt_remove {
  float: right;
}
</style>
