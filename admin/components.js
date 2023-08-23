import path from "node:path";
import pkg from 'adminjs';

const { ComponentLoader } = pkg;

const componentLoader = new ComponentLoader()

const Components = {
    FeaturedOfferComponent: componentLoader.add('FeaturedOfferComponent', path.resolve("admin/FeaturedOfferComponent.jsx")),
    // other custom components
}

export { componentLoader, Components }