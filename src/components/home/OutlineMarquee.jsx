import { ImageBand } from '../ui/Motion'
import { IMG } from '../../data/images'

export default function OutlineMarquee() {
  return <ImageBand image={IMG.cranesSky} rowA="Residential · Commercial · Industrial" rowB="Civil Engineering · Infrastructure · Project Management" label="Our disciplines" />
}
