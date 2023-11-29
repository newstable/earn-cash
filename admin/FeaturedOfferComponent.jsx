import React, { useRef, useState } from "react";
import styled from "styled-components";
import { offerWalls } from "../src/lib/offerWalls";
import { Button, Input } from "@adminjs/design-system";
import { useResourceAction } from "@adminjs/react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 7px;
  border: 0;
  font-size: 16px;
`;

const SubmitForm = styled(Button)`
  cursor: pointer;
`;

const FeaturedOfferComponent = (props) => {
  const [offerId, setOfferId] = useState("");
  const [offerWall, setOfferWall] = useState(offerWalls[0].wallId);
  const [myCustomAction, { loading }] = useResourceAction({
    resourceId: props.resource.id,
    actionName: "addAnother",
  });

  const refForm = useRef();

  const submitForm = async () => {
    if (offerId.length < 1) return;

    var found = false;
    for (var i = 0; i < offerWalls.length; i++) {
      const offerWallId = offerWalls[i].wallId.toString();

      if (offerWallId == offerWall) {
        found = true;
      }
    }

    if (!found) return;

    console.log("hi");
    await myCustomAction(new FormData(refForm));
  };

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Offer Id"
        onChange={(e) => setOfferId(e.target.value)}
        value={offerId}
      />
      <Select onChange={(e) => setOfferWall(e.target.value)} value={offerWall}>
        {offerWalls.map((offerwall, i) => (
          <option key={offerwall.simple} value={offerwall.wallId}>
            {offerwall.wallName}
          </option>
        ))}
      </Select>

      <form method="POST" ref={refForm}>
        <input type="hidden" name="offerId" value={offerId} />
        <input type="hidden" name="offerWallId" value={offerWall} />
      </form>

      <SubmitForm
        variant="contained"
        size="lg"
        color="primary"
        onClick={() => submitForm()}
      >
        Add Featured Offer
      </SubmitForm>
    </Wrapper>
  );
};

export default FeaturedOfferComponent;
